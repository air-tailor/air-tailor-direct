class SessionsController < ApplicationController

  def new
    if session[:user_id]
      redirect_to "/new_order"
    end
  end



    def create
    customer = Customer.find_by_email(params[:email])
    # If the user exists AND the password entered is correct.
    if customer && customer.authenticate(params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user
      # logged in when they navigate around our website.
      session[:user_id] = customer.id
      redirect_to "/new_order"
    else
    # If user's login doesn't work, send them back to the login form.
      flash[:fail] = "Oops! Couldn't log in. Please make sure you are using a valid email and password and try again."
      redirect_to '/login'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end

end
