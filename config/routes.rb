DualNBackTwo::Application.routes.draw do
  root to: "dual_n_back#index"
  get '/dual_n_back' => 'dual_n_back#index'
end
