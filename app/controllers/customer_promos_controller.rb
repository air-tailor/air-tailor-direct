class CustomerPromosController < ApplicationController

  def create
    @customer = current_customer
    @promo_name = params[:promo_name].downcase
    @promo = Promo.where(promo_name: @promo_name).first

    if @promo

      if @promo.expiration < Date.today
        flash[:fail] = "Sorry, this promo code has expired."
      else

        @used_promos = CustomerPromo.where(customer_id: @customer.id).where(promo_id: @promo.id).first

        if @used_promos
          if @used_promos.used == true
            flash[:fail] = "Promo code has already been used."
            redirect_to review_path
          else
            redirect_to review_path(promo_name: @promo.promo_name, promo_amount: @promo.amount, promo_type: @promo.promo_type)
            flash[:success] = "Promo Code Applied."
          end

        else
          @customer_promo = CustomerPromo.new(customer_id: current_customer.id, promo_id: @promo.id, used: false)

          if @customer_promo.save
            # If user saves in the db successfully:
            redirect_to review_path(promo_name: @promo.promo_name, promo_amount: @promo.amount, promo_type: @promo.promo_type)
            flash[:success] = "Promo Code Applied."

          else
            # If user fails model validation - probably a bad password or duplicate email:
            @customer_promo.errors.full_messages.each do |message|
              flash[:fail] = "Error: " + message
              redirect_to review_path
            end
          end
        end
      end
    else
      flash[:fail] = "Promo code not recognized. Please check and try again."
      redirect_to review_path
    end


  end
end
