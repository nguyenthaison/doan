class AddFieldToTable < ActiveRecord::Migration
  def change
    add_reference :troubles, :field, index: true, foreign_key: true
    add_reference :trouble_names, :field, index: true, foreign_key: true
    add_reference :steps, :field, index: true, foreign_key: true
    add_reference :tags, :field, index: true, foreign_key: true
    add_reference :notifications, :field, index: true, foreign_key: true
    add_reference :lines, :field, index: true, foreign_key: true
    add_reference :faquestions, :field, index: true, foreign_key: true
    add_reference :communities, :field, index: true, foreign_key: true
    add_reference :clients, :field, index: true, foreign_key: true
    add_reference :settings, :field, index: true, foreign_key: true
  end
end
