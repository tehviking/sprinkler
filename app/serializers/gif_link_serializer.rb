class GifLinkSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :description
end
