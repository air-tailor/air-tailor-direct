if Rails.env.development?
  Rails.configuration.stripe = {
    :publishable_key => 'pk_test_SAfpkFB2WVKLbQVukGCTVq5Z',
    :secret_key      => 'sk_test_BRPpISwsTFnO5ih1WlxbvSkz'
  }
elsif Rails.env.production?
  Rails.configuration.stripe = {
    :publishable_key => 'pk_test_SAfpkFB2WVKLbQVukGCTVq5Z',
    :secret_key      => 'sk_test_BRPpISwsTFnO5ih1WlxbvSkz'
  }
end

Stripe.api_key = Rails.configuration.stripe[:secret_key]


# development:
#   stripe_secret_key: 'sk_test_BRPpISwsTFnO5ih1WlxbvSkz'
#   stripe_publishable_key: 'pk_test_SAfpkFB2WVKLbQVukGCTVq5Z'


# ENV['STRIPE_PUBLISHABLE_KEY']
# pk_live_SHJFBX3mFxtBxVCTGJNH7RCU

# ENV['STRIPE_SECRET_KEY']
# sk_live_2URyVgciLNJCLO67fWimEBMB
