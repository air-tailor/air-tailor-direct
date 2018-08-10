Rails.application.routes.draw do


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'customers#new_order'

  resources :sessions, only: [:create, :new, :destoy]
    get '/logout', to: 'sessions#destroy'
    get '/login', to: 'sessions#new'
    post '/login' => 'sessions#create'

  resources :password_resets
  resources :promos
  resources :customer_promos
  resources :customers
  resources :charges

  get '/new_order', to: 'customers#new_order'
  get '/thank_you', to: 'customers#thank_you'
  post '/order_error', to: 'customers#order_error'
  post '/order_success', to: 'customers#order_success'
  post '/order_kit', to: 'customers#order_kit'
  get '/terms', to: 'customers#terms'
  get '/review', to: 'customers#review'
  get '/temp', to: 'customers#construction'


  # Let’s encrypt
  get '/.well-known/acme-challenge/:id' => 'customers#letsencrypt'


end
