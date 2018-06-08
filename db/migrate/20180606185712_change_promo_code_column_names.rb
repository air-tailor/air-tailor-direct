class ChangePromoCodeColumnNames < ActiveRecord::Migration[5.1]
  def change
    rename_column :promos, :name, :promo_name
    rename_column :promos, :type, :promo_type
  end
end
