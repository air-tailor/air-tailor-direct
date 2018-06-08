class CustomerPromo < ApplicationRecord
  belongs_to :customer
  belongs_to :promo
end
