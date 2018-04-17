class ChargesController < ApplicationController

require "stripe"

  def new
  end

  def create

    @amount = params[:amount].to_f
    @amount = (@amount * 100).round(2)

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    if charge["paid"] == true
      redirect_to "/thank_you"
    end

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_charge_path

  end
end
