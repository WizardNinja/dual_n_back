class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
    	t.integer :score
    	t.integer :level
    	t.integer :user_id

      t.timestamps
    end
  end
end
