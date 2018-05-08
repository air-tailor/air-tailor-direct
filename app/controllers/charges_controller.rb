class ChargesController < ApplicationController

require "stripe"

  def new
  end

  def create

    @amount = params[:amount].to_f
    @amount = (@amount * 100).round()


    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Air Tailor Alterations',
      :currency    => 'usd'
    )

    if charge["paid"] == true
      redirect_to thank_you_path
    end

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_charge_path

  end
end
