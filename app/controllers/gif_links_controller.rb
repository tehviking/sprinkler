class GifLinksController < ApplicationController
  before_action :set_gif_link, only: [:show, :edit, :update, :destroy]
  respond_to :json, :html
  # GET /gif_links
  def index
    @gif_links = GifLink.all
  end

  # GET /gif_links/1
  def show
    respond_with @gif_link
  end

  # GET /gif_links/new
  def new
    @gif_link = GifLink.new
  end

  # GET /gif_links/1/edit
  def edit
  end

  # POST /gif_links
  def create
    @gif_link = GifLink.create(gif_link_params)
    respond_with @gif_link
  end

  # PATCH/PUT /gif_links/1
  def update
    if @gif_link.update(gif_link_params)
      respond_with @gif_link
    end
  end

  # DELETE /gif_links/1
  def destroy
    @gif_link.destroy
    respond_to do |format|
      format.html {redirect_to gif_links_url}
      format.json {render nothing: true}
    end
  end

  def details
    respond_to do |format|
      format.html { render "ember/index" }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gif_link
      @gif_link = GifLink.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def gif_link_params
      params.require(:gif_link).permit(:title, :url, :description)
    end
end
