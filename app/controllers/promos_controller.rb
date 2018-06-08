class PromosController < ApplicationController

  def index
    if current_customer.is_admin?
      @promos = Promo.all
    else
      redirect_to new_order_path
    end
  end

  def show
    if current_customer.is_admin?
      @promo = Promo.find(params[:id])
    else
      redirect_to new_order_path
    end
  end

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

  def edit
    @promo = Promo.find_by(id: params[:id])
  end

  def update
    @promo = Promo.find_by(id: params[:id])
    @promo.assign_attributes(promo_params)

    if @promo.update_attributes(promo_params)
      flash[:success] = "Promo updated successfully."
     redirect_to "/promos"
   else
      flash[:fail] = "Error updating promo. Please try again."
     redirect_to edit_promo_path
   end
  end

  def destroy
    @promo = Promo.find_by(id: params[:id])
    @promo.destroy
    redirect_to '/promos'
  end

private

  def promo_params
    params.require(:promo).permit(:promo_name, :promo_type, :amount, :expiration)
  end

end
