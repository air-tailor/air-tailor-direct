class PromosController < ApplicationController
  def new
    if current_customer.is_admin?
      @promo = Promo.new
    else
      redirect_to new_order_path
    end
  end

  def create
    if current_customer.is_admin?
      @promo = Promo.new(promo_params)
      if @promo.save
        flash[:success] = "New promo code created!"
        redirect_to "/promos"
      else
        @promo.errors.full_messages.each do |message|
          flash[:fail] = "Error: " + message
        end
        redirect_to new_promo_path
      end
    else
      redirect_to new_order_path
    end
  end

  def index
    if current_customer.is_admin?
      @promos = Promo.all
    else
      redirect_to new_order_path
    end
  end

private

  def promo_params
    params.require(:promo).permit(:promo_name, :promo_type, :amount, :expiration)
  end

end
