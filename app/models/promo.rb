class Promo < ApplicationRecord
  has_many :customer_promos
  has_many :customers, :through => :customer_promos

  before_save { |promo| promo.promo_name = promo_name.downcase }
end
