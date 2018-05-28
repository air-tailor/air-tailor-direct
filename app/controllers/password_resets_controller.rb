class PasswordResetsController < ApplicationController
  def new
    if session[:user_id]
      redirect_to "/new_order"
    end
  end

  def create
    email = params[:email].downcase!
    customer = Customer.find_by_email(email)
    customer.send_password_reset if customer
    flash[:success] = 'E-mail sent with password reset instructions.'
    redirect_to new_session_path
  end

  def edit
    @customer = Customer.find_by_password_reset_token!(params[:id])
  end

  def update
    @customer = Customer.find_by_password_reset_token!(params[:id])
    if @customer.password_reset_sent_at < 2.hour.ago
      flash[:fail] = 'Password reset has expired'
      redirect_to new_password_reset_path
    elsif @customer.update(customer_params)
      flash[:success] = 'Password has been reset!'
      redirect_to new_session_path
    else
      render :edit
    end
  end

private
  # Never trust parameters from the scary internet, only allow the white list through.
  def customer_params
    params.require(:customer).permit(:password)
  end

end
