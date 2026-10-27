import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/howto_model.dart';

/// Loads the cross-app how-to index from assets/howto.json.
///
/// This asset is optional — some branches/deployments of this site may not
/// have it yet (it is synced in from each app's own repo), so any failure to
/// load or parse it must never crash the app.
class HowtoService {
  Future<HowtoIndexModel> loadHowtoIndex() async {
    try {
      final String response = await rootBundle.loadString('assets/howto.json');
      final data = json.decode(response);
      if (data is Map<String, dynamic>) {
        return HowtoIndexModel.fromJson(data);
      }
      return HowtoIndexModel(apps: []);
    } catch (_) {
      return HowtoIndexModel(apps: []);
    }
  }
}
