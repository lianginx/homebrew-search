export interface Formula {
  name: string;
  full_name: string;
  tap: string;
  oldnames: string[];
  aliases: string[];
  versioned_formulae: string[];
  desc: string;
  license: string;
  homepage: string;
  versions: {
    stable: string;
    head: string | null;
    bottle: boolean;
  };
  urls: {
    stable: {
      url: string;
      tag: string | null;
      revision: string | null;
      using: string | null;
      checksum: string;
    };
  };
  revision: number;
  version_scheme: number;
  autobump: boolean;
  no_autobump_message: string | null;
  skip_livecheck: boolean;
  bottle: {
    stable: {
      rebuild: number;
      root_url: string;
      files: Record<
        string,
        {
          cellar: string;
          url: string;
          sha256: string;
        }
      >;
    };
  };
  pour_bottle_only_if: unknown; // 具体类型未知
  keg_only: boolean;
  keg_only_reason: string | null;
  options: unknown[]; // 通常为空
  build_dependencies: string[];
  dependencies: string[];
  test_dependencies: string[];
  recommended_dependencies: string[];
  optional_dependencies: string[];
  uses_from_macos: string[];
  uses_from_macos_bounds: Record<string, unknown>[]; // 通常是空对象数组
  requirements: unknown[];
  conflicts_with: string[];
  conflicts_with_reasons: string[];
  link_overwrite: string[];
  caveats: string | null;
  installed: unknown[];
  linked_keg: string | null;
  pinned: boolean;
  outdated: boolean;
  deprecated: boolean;
  deprecation_date: string | null;
  deprecation_reason: string | null;
  deprecation_replacement_formula: string | null;
  deprecation_replacement_cask: string | null;
  disabled: boolean;
  disable_date: string | null;
  disable_reason: string | null;
  disable_replacement_formula: string | null;
  disable_replacement_cask: string | null;
  post_install_defined: boolean;
  service: unknown; // 通常为 null
  tap_git_head: string;
  ruby_source_path: string;
  ruby_source_checksum: {
    sha256: string;
  };
  variations: Record<string, unknown>;
}

export interface Cask {
  token: string;
  full_token: string;
  old_tokens: string[];
  tap: string;
  name: string[];
  desc: string;
  homepage: string;
  url: string;
  url_specs: {
    verified: string;
  };
  version: string;
  autobump: boolean;
  no_autobump_message: string | null;
  skip_livecheck: boolean;
  installed: unknown;
  installed_time: unknown;
  bundle_version: string;
  bundle_short_version: string;
  outdated: boolean;
  sha256: string;
  artifacts: Artifact[];
  caveats: string | null;
  depends_on: {
    macos?: {
      ">=": string[];
    };
  };
  conflicts_with: {
    cask: string[];
  };
  container: unknown;
  auto_updates: boolean;
  deprecated: boolean;
  deprecation_date: string | null;
  deprecation_reason: string | null;
  deprecation_replacement_formula: string | null;
  deprecation_replacement_cask: string | null;
  disabled: boolean;
  disable_date: string | null;
  disable_reason: string | null;
  disable_replacement_formula: string | null;
  disable_replacement_cask: string | null;
  tap_git_head: string;
  languages: string[];
  ruby_source_path: string;
  ruby_source_checksum: {
    sha256: string;
  };
  variations: Record<string, unknown>;
}

export type Artifact =
  | { preflight: null }
  | { uninstall: Array<{ quit: string }> }
  | { app: string[] }
  | { binary: [string, { target: string }] }
  | {
      zap: Array<{
        trash?: string[];
        rmdir?: string[];
      }>;
    };
