Sprinkler::Application.routes.draw do
  resources :gif_links do
    get :details, on: :member
  end
  resources :ember, controller: "ember", only: [ :index ]

  root 'gif_links#index'
end
