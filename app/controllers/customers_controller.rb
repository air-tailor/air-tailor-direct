class CustomersController < ApplicationController

before_action :authorize, :except => [:new, :create, :terms]

  def new_order
    @customer = current_customer
  end

  def order_kit
    @customer = current_customer
    AirtailorMailer.order_kit_email(@customer).deliver!
  end

  def review
    @customer = current_customer
    @customer_promo = CustomerPromo.new

    @promo_name = params[:promo_name]
    @promo_type = params[:promo_type]
    @promo_amount = params[:promo_amount]

  end

  def thank_you
    @customer = current_customer
    @customer.update_attributes(:kit_requested => false)
    @promo_join = CustomerPromo.where(customer_id: current_customer.id).where(used: false).last
    if @promo_join
      @promo = Promo.where(id: @promo_join.promo_id).first
      @promo_join.update_attributes(used: true)
    end
  end

  def order_success
    @customer = current_customer
    @data = params[:data].to_unsafe_h
    @data = @data[:order][:items].values
    @res = params[:res].to_unsafe_h
    AirtailorMailer.success_email(@customer, @data, @res).deliver!
  end

  def order_error
    @customer = current_customer
    @original_data = params[:data].to_unsafe_h
    @notes = @original_data[:order][:requester_notes]
    @data = @original_data[:order][:items].values
    @res = params[:res]
    AirtailorMailer.error_email(@customer, @data, @notes, @res).deliver!
  end

  def show

  end

  def index

  end

  def new
    if session[:user_id]
      redirect_to "/new_order"
    else
      @customer = Customer.new
    end
  end

  def create
    @customer = Customer.new(customer_params)

     # store all emails in lowercase to avoid duplicates and case-sensitive login errors:
    @customer.email.downcase!

    if @customer.save
      # If user saves in the db successfully:
      flash[:success] = "Account created successfully!"
      session[:user_id] = @customer.id
      redirect_to "/new_order"
   else
    # If user fails model validation - probably a bad password or duplicate email:
      @customer.errors.full_messages.each do |message|
        flash[:fail] = "Error: " + message
      end

      redirect_to new_customer_path
   end
  end

  def edit
    @customer = Customer.find_by(id: params[:id])
  end

  def update
    @customer = Customer.find_by(id: params[:id])

    @customer.assign_attributes(customer_params)

   if @customer.update_attributes(customer_params)
      flash[:success] = "Account updated successfully."
     redirect_to "/new_order"
   else
      flash[:fail] = "Unable to update. Please ensure all required fields are filled correctly."
     redirect_to edit_customer_path
   end
  end

  def destroy

  end


  def terms
  end

  def letsencrypt
    render text: "#{params[:id]}.-qmcvblrvkMCeDA2rvDMc888MmA_InPSkGcWBveqPhio"
  end




private

  def customer_params
    params.require(:customer).permit(:first_name, :last_name, :email, :password, :password_confirmation, :phone, :street, :street_two, :city, :state_province, :zip_code)
  end

end
