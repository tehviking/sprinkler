class CreateGifLinks < ActiveRecord::Migration
  def change
    create_table :gif_links do |t|
      t.string :title
      t.string :url
      t.text :description

      t.timestamps
    end
  end
end
