class CustomersController < ApplicationController

before_action :authorize, :except => [:new, :create]

  def new_order
    @customer = current_customer
  end

  def thank_you
    @customer = current_customer
  end

  def show

  end

  def index

  end

  def new
    @customer = Customer.new
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
      flash[:fail] = "Oops! Couldn't create account. Please make sure you are using a valid email and password and try again."

      redirect_to new_customer_path
   end
  end

  def edit
    @customer = Customer.find_by(id: params[:id])
  end

  def update
    @customer = Customer.find_by(id: params[:id])

    @customer.assign_attributes(customer_params)

   if @customer.update
     @customer.update_attributes(customer_params)
     redirect_to "/new_order"
   else
     redirect_to edit_customer_path
   end
  end

  def destroy

  end






private

  def customer_params
    params.require(:customer).permit(:first_name, :last_name, :email, :password, :password_confirmation, :phone, :street, :street_two, :city, :state_province, :zip_code)
  end

end
