class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_customer
    @current_customer ||= Customer.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_customer

  def authorize
    redirect_to '/login' unless current_customer
  end




end
