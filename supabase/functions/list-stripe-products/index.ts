import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[LIST-STRIPE-PRODUCTS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // List all products
    const products = await stripe.products.list({ limit: 100 });
    logStep("Retrieved products", { count: products.data.length });

    // List all prices
    const prices = await stripe.prices.list({ limit: 100 });
    logStep("Retrieved prices", { count: prices.data.length });

    // Combine products with their prices
    const productsWithPrices = products.data.map(product => {
      const productPrices = prices.data.filter(price => price.product === product.id);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        active: product.active,
        prices: productPrices.map(price => ({
          id: price.id,
          currency: price.currency,
          unit_amount: price.unit_amount,
          recurring: price.recurring,
          type: price.type, // 'one_time' or 'recurring'
        }))
      };
    });

    logStep("Combined products with prices", { productsWithPrices });

    return new Response(JSON.stringify({ 
      products: productsWithPrices,
      summary: {
        total_products: products.data.length,
        total_prices: prices.data.length,
        recurring_products: productsWithPrices.filter(p => 
          p.prices.some(price => price.type === 'recurring')
        ).length,
        one_time_products: productsWithPrices.filter(p => 
          p.prices.some(price => price.type === 'one_time')
        ).length,
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in list-stripe-products", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});