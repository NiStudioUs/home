/// Models for the cross-app how-to index (assets/howto.json), synced into this
/// repo from each app's own content (e.g. people-app-iky-v2's
/// scripts/publish_events_howto_to_website.py). This is a shared index keyed
/// by app id — other apps may add their own entries over time.
class HowtoIndexModel {
  final List<HowtoAppModel> apps;

  HowtoIndexModel({this.apps = const []});

  factory HowtoIndexModel.fromJson(Map<String, dynamic> json) {
    return HowtoIndexModel(
      apps: (json['apps'] as List? ?? [])
          .map((e) => HowtoAppModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}

class HowtoAppModel {
  final String id;
  final String title;
  final List<HowtoFeatureModel> features;

  HowtoAppModel({
    required this.id,
    required this.title,
    this.features = const [],
  });

  factory HowtoAppModel.fromJson(Map<String, dynamic> json) {
    return HowtoAppModel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      features: (json['features'] as List? ?? [])
          .map((e) => HowtoFeatureModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}

class HowtoFeatureModel {
  final String id;
  final String title;
  final String intro;
  final List<HowtoTopicModel> topics;

  HowtoFeatureModel({
    required this.id,
    required this.title,
    this.intro = '',
    this.topics = const [],
  });

  factory HowtoFeatureModel.fromJson(Map<String, dynamic> json) {
    return HowtoFeatureModel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      intro: json['intro'] as String? ?? '',
      topics: (json['topics'] as List? ?? [])
          .map((e) => HowtoTopicModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}

class HowtoTopicModel {
  final String id;
  final String title;
  final List<String> steps;
  final List<HowtoImage> images;
  final List<String> references;

  HowtoTopicModel({
    required this.id,
    required this.title,
    this.steps = const [],
    this.images = const [],
    this.references = const [],
  });

  factory HowtoTopicModel.fromJson(Map<String, dynamic> json) {
    return HowtoTopicModel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      steps: (json['steps'] as List? ?? []).map((e) => e.toString()).toList(),
      images: (json['images'] as List? ?? [])
          .map((e) => HowtoImage.fromJson(e))
          .toList(),
      references: (json['references'] as List? ?? [])
          .map((e) => e.toString())
          .toList(),
    );
  }
}

class HowtoImage {
  final String url;
  final String caption;

  HowtoImage({required this.url, this.caption = ''});

  factory HowtoImage.fromJson(dynamic json) {
    if (json is String) {
      return HowtoImage(url: json);
    } else if (json is Map<String, dynamic>) {
      return HowtoImage(
        url: json['url'] as String? ?? '',
        caption: json['caption'] as String? ?? '',
      );
    }
    return HowtoImage(url: '');
  }
}
