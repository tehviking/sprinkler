require 'test_helper'

class GifLinksControllerTest < ActionController::TestCase
  setup do
    @gif_link = gif_links(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gif_links)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gif_link" do
    assert_difference('GifLink.count') do
      post :create, gif_link: { description: @gif_link.description, title: @gif_link.title, url: @gif_link.url }
    end

    assert_redirected_to gif_link_path(assigns(:gif_link))
  end

  test "should show gif_link" do
    get :show, id: @gif_link
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gif_link
    assert_response :success
  end

  test "should update gif_link" do
    patch :update, id: @gif_link, gif_link: { description: @gif_link.description, title: @gif_link.title, url: @gif_link.url }
    assert_redirected_to gif_link_path(assigns(:gif_link))
  end

  test "should destroy gif_link" do
    assert_difference('GifLink.count', -1) do
      delete :destroy, id: @gif_link
    end

    assert_redirected_to gif_links_path
  end
end
