class DataModel {
  final Developer developer;
  final List<AppModel> apps;
  final List<SocialLink> socialLinks;

  DataModel({
    required this.developer,
    required this.apps,
    required this.socialLinks,
  });

  factory DataModel.fromJson(Map<String, dynamic> json) {
    return DataModel(
      developer: Developer.fromJson(json['developer']),
      socialLinks:
          (json['socialLinks'] as List<dynamic>?)
              ?.map((e) => SocialLink.fromJson(e))
              .toList() ??
          [],
      apps: (json['apps'] as List).map((e) => AppModel.fromJson(e)).toList(),
    );
  }
}

class Developer {
  final String name;
  final String shortName;
  final String bio;
  final String role;
  final String avatarUrl;
  final String email;
  final String bannerUrl;
  final FeatureImage badge;

  Developer({
    required this.name,
    required this.shortName,
    required this.bio,
    required this.role,
    required this.avatarUrl,
    required this.email,
    required this.bannerUrl,
    required this.badge,
  });

  factory Developer.fromJson(Map<String, dynamic> json) {
    return Developer(
      name: json['name'] as String,
      shortName: json['shortName'] as String? ?? '',
      bio: json['bio'] as String,
      role: json['role'] as String,
      avatarUrl: json['avatarUrl'] as String,
      email: json['email'] as String,
      bannerUrl: json['bannerUrl'] as String? ?? '',
      badge: json['badge'] != null
          ? FeatureImage.fromJson(json['badge'])
          : FeatureImage(url: '', caption: ''),
    );
  }
}

class SocialLink {
  final String platform;
  final String url;
  final String icon;

  SocialLink({required this.platform, required this.url, required this.icon});

  factory SocialLink.fromJson(Map<String, dynamic> json) {
    return SocialLink(
      platform: json['platform'] as String,
      url: json['url'] as String,
      icon: json['icon'] as String,
    );
  }
}

class AppModel {
  final String id;
  final String name;
  final String shortDescription;
  final String fullDescription;
  final String iconUrl;
  final List<AppFeature> features;
  final List<AppFeature> technicalDetails;
  final List<FeatureImage> screenshots;
  final List<AppLink> links;
  final AppPolicy privacyPolicy;
  final AppPolicy termsAndConditions;
  final List<FeatureImage> descriptionImages;

  AppModel({
    required this.id,
    required this.name,
    required this.shortDescription,
    required this.fullDescription,
    required this.iconUrl,
    required this.features,
    required this.technicalDetails,
    required this.screenshots,
    required this.links,
    required this.privacyPolicy,
    required this.termsAndConditions,
    this.descriptionImages = const [],
  });

  factory AppModel.fromJson(Map<String, dynamic> json) {
    return AppModel(
      id: json['id'] as String,
      name: json['name'] as String,
      shortDescription: json['shortDescription'] as String,
      fullDescription: json['fullDescription'] as String,
      iconUrl: json['iconUrl'] as String,
      features: (json['features'] as List)
          .map((e) => AppFeature.fromJson(e))
          .toList(),
      technicalDetails: (json['technicalDetails'] as List? ?? [])
          .map((e) => AppFeature.fromJson(e))
          .toList(),
      screenshots: (json['screenshots'] as List? ?? [])
          .map((e) => FeatureImage.fromJson(e))
          .toList(),
      links: (json['links'] as List).map((e) => AppLink.fromJson(e)).toList(),
      privacyPolicy: AppPolicy.fromJson(json['privacyPolicy'] ?? {}),
      termsAndConditions: AppPolicy.fromJson(json['termsAndConditions'] ?? {}),
      descriptionImages: (json['descriptionImages'] as List? ?? [])
          .map((e) => FeatureImage.fromJson(e))
          .toList(),
    );
  }
}

class AppPolicy {
  final String url;
  final String? lastUpdatedUtc;
  final List<AppFeature> features;

  AppPolicy({required this.url, required this.features, this.lastUpdatedUtc});

  factory AppPolicy.fromJson(Map<String, dynamic> json) {
    return AppPolicy(
      url: json['url'] as String? ?? '',
      lastUpdatedUtc: json['lastUpdatedUtc'] as String?,
      features: (json['features'] as List? ?? [])
          .map((e) => AppFeature.fromJson(e))
          .toList(),
    );
  }
}

class AppFeature {
  final String title;
  final String subtitle;
  final String? websiteUrl;
  final bool? hide;
  final String? lastUpdatedUtc;
  final List<FeatureSection> sections;

  AppFeature({
    required this.title,
    required this.subtitle,
    required this.sections,
    this.websiteUrl,
    this.hide,
    this.lastUpdatedUtc,
  });

  factory AppFeature.fromJson(Map<String, dynamic> json) {
    return AppFeature(
      title: json['title'] as String,
      subtitle: json['subtitle'] ?? '',
      websiteUrl: json['websiteUrl'] as String?,
      hide: json['hide'] as bool?,
      lastUpdatedUtc: json['last_updated_utc'] as String?,
      sections: (json['sections'] as List)
          .map((e) => FeatureSection.fromJson(e))
          .toList(),
    );
  }
}

class FeatureSection {
  final String title;
  final String content;
  final String? websiteUrl;
  final bool? hide;
  final String? lastUpdatedUtc;
  final List<FeatureImage> images;
  final String imageRenderer; // 'default', 'carousel', 'list', 'grid'

  FeatureSection({
    required this.title,
    required this.content,
    required this.images,
    this.websiteUrl,
    this.hide,
    this.lastUpdatedUtc,
    this.imageRenderer = 'default',
  });

  factory FeatureSection.fromJson(Map<String, dynamic> json) {
    return FeatureSection(
      title: json['title'] as String,
      content: json['content'] as String,
      websiteUrl: json['websiteUrl'] as String?,
      hide: json['hide'] as bool?,
      lastUpdatedUtc: json['last_updated_utc'] as String?,
      images: (json['images'] as List? ?? [])
          .map((e) => FeatureImage.fromJson(e))
          .toList(),
      imageRenderer: json['imageRenderer'] as String? ?? 'default',
    );
  }
}

class FeatureImage {
  final String url;
  final String caption;

  FeatureImage({required this.url, this.caption = ''});

  factory FeatureImage.fromJson(dynamic json) {
    if (json is String) {
      return FeatureImage(url: json);
    } else if (json is Map<String, dynamic>) {
      return FeatureImage(
        url: json['url'] as String? ?? '',
        caption: json['caption'] as String? ?? '',
      );
    }
    return FeatureImage(url: '');
  }
}

class AppLink {
  final String type;
  final String url;

  AppLink({required this.type, required this.url});

  factory AppLink.fromJson(Map<String, dynamic> json) {
    return AppLink(
      type: (json['type'] ?? json['title']) as String? ?? 'Link',
      url: json['url'] as String? ?? '',
    );
  }
}
