class TagSerializer < ActiveModel::Serializer
  attributes *Tag.column_names, :parent
end
