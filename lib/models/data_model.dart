class DataModel {
  final Developer developer;
  final List<AppModel> apps;

  DataModel({required this.developer, required this.apps});

  factory DataModel.fromJson(Map<String, dynamic> json) {
    return DataModel(
      developer: Developer.fromJson(json['developer']),
      apps: (json['apps'] as List).map((e) => AppModel.fromJson(e)).toList(),
    );
  }
}

class Developer {
  final String name;
  final String bio;
  final String role;
  final String avatarUrl;
  final String email;
  final List<SocialLink> socialLinks;

  Developer({
    required this.name,
    required this.bio,
    required this.role,
    required this.avatarUrl,
    required this.email,
    required this.socialLinks,
  });

  factory Developer.fromJson(Map<String, dynamic> json) {
    return Developer(
      name: json['name'] as String,
      bio: json['bio'] as String,
      role: json['role'] as String,
      avatarUrl: json['avatarUrl'] as String,
      email: json['email'] as String,
      socialLinks: (json['socialLinks'] as List)
          .map((e) => SocialLink.fromJson(e))
          .toList(),
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
  final List<String> features;
  final List<String> screenshots;
  final List<AppLink> links;
  final String privacyPolicyUrl;
  final String termsUrl;

  AppModel({
    required this.id,
    required this.name,
    required this.shortDescription,
    required this.fullDescription,
    required this.iconUrl,
    required this.features,
    required this.screenshots,
    required this.links,
    required this.privacyPolicyUrl,
    required this.termsUrl,
  });

  factory AppModel.fromJson(Map<String, dynamic> json) {
    return AppModel(
      id: json['id'] as String,
      name: json['name'] as String,
      shortDescription: json['shortDescription'] as String,
      fullDescription: json['fullDescription'] as String,
      iconUrl: json['iconUrl'] as String,
      features: List<String>.from(json['features']),
      screenshots: List<String>.from(json['screenshots']),
      links: (json['links'] as List).map((e) => AppLink.fromJson(e)).toList(),
      privacyPolicyUrl: json['privacyPolicyUrl'] as String,
      termsUrl: json['termsUrl'] as String,
    );
  }
}

class AppLink {
  final String type;
  final String url;

  AppLink({required this.type, required this.url});

  factory AppLink.fromJson(Map<String, dynamic> json) {
    return AppLink(type: json['type'] as String, url: json['url'] as String);
  }
}
