class PublishNavigationWorker
  include Sidekiq::Worker

  def perform navigation_id
    navigation = Navigation.find navigation_id
    navigations = navigation.line.navigations

    navigations.each do |n|
      if n.id != navigation.id
        n.update_column :publish_date, nil
      end
    end
  end
end
