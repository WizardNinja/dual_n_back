StylingExp::Application.routes.draw do
  root to: "main#index"
  post '/scores/:score/:level' => 'scores#create'
  get '/scores' => 'scores#index'
  get '/scores/:user_id' => 'scores#show'
  resources :users, except: [:index]
  resources :sessions, only: [:new, :create]
  post '/sessions' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/instructions' => 'main#instructions'
end
