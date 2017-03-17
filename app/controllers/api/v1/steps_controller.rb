class Api::V1::StepsController < Api::BaseController
  before_action :filter_by_field, only: :index

  def index
    response_success base_index_response "steps"
  end

  def update_all_steps
    errors = {}
    active_steps = params[:steps].select {|key, hash| hash["active"] == "true"}

    if active_steps.present?
      params[:steps].each do |index, step|
        new_step = Step.find_by_id step[:id]

        if new_step.field_id == session[:field_id]
          unless new_step.update_attributes step.permit(:name, :active)
            errors[index] = new_step.errors
          end
        end
      end

      if errors.size > 0
        response_fail errors: errors
      else
        response_success
      end
    else
      response_fail no_active_step: true
    end
  end
end
