class ChargesController < ApplicationController

require "stripe"

  def new
  end

  def create

    @amount = params[:amount]

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => 600,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    if charge["paid"] == true
      redirect_to "/"
    end

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_charge_path

  end
end
