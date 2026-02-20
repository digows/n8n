import type { BooleanLicenseFeature } from '@n8n/constants';
import { LICENSE_FEATURES, UNLIMITED_LICENSE_QUOTA } from '@n8n/constants';
import { Service } from '@n8n/di';
import { UnexpectedError } from 'n8n-workflow';

import type { FeatureReturnType, LicenseProvider } from './types';

class ProviderNotSetError extends UnexpectedError {
	constructor() {
		super('Cannot query license state because license provider has not been set');
	}
}

@Service()
export class LicenseState {
	licenseProvider: LicenseProvider | null = null;

	setLicenseProvider(provider: LicenseProvider) {
		this.licenseProvider = provider;
	}

	private assertProvider(): asserts this is { licenseProvider: LicenseProvider } {
		if (!this.licenseProvider) throw new ProviderNotSetError();
	}

	// --------------------
	//     core queries
	// --------------------
	/*
	 * If the feature is a string. checks if the feature is licensed
	 * If the feature is an array of strings, it checks if any of the features are licensed
	 */
	isLicensed(feature: BooleanLicenseFeature | BooleanLicenseFeature[]) {
		return true;

		// this.assertProvider();
		//
		// if (typeof feature === 'string') return this.licenseProvider.isLicensed(feature);
		//
		// for (const featureName of feature) {
		// 	if (this.licenseProvider.isLicensed(featureName)) {
		// 		return true;
		// 	}
		// }
		//
		// return false;
	}

	getValue<T extends keyof FeatureReturnType>(feature: T): FeatureReturnType[T] {
		this.assertProvider();

		return this.licenseProvider.getValue(feature);
	}

	// --------------------
	//      booleans
	// --------------------

	isCustomRolesLicensed() {
		return true;
		//return this.isLicensed(LICENSE_FEATURES.CUSTOM_ROLES);
	}

	isDynamicCredentialsLicensed() {
		return true;
		//return this.isLicensed(LICENSE_FEATURES.DYNAMIC_CREDENTIALS);
	}

	isPersonalSpacePolicyLicensed() {
		return true;
		//return this.isLicensed(LICENSE_FEATURES.PERSONAL_SPACE_POLICY);
	}

	isSharingLicensed() {
		return true;
		//return this.isLicensed('feat:sharing');
	}

	isLogStreamingLicensed() {
		return true;
		//return this.isLicensed('feat:logStreaming');
	}

	isLdapLicensed() {
		return true;
		//return this.isLicensed('feat:ldap');
	}

	isSamlLicensed() {
		return true;
		//return this.isLicensed('feat:saml');
	}

	isOidcLicensed() {
		return true;
		//return this.isLicensed('feat:oidc');
	}

	isMFAEnforcementLicensed() {
		return true;
		//return this.isLicensed('feat:mfaEnforcement');
	}

	isApiKeyScopesLicensed() {
		return true;
		//return this.isLicensed('feat:apiKeyScopes');
	}

	isAiAssistantLicensed() {
		return true;
		//return this.isLicensed('feat:aiAssistant');
	}

	isAskAiLicensed() {
		return true;
		//return this.isLicensed('feat:askAi');
	}

	isAiCreditsLicensed() {
		return true;
		//return this.isLicensed('feat:aiCredits');
	}

	isAdvancedExecutionFiltersLicensed() {
		return true;
		//return this.isLicensed('feat:advancedExecutionFilters');
	}

	isAdvancedPermissionsLicensed() {
		return true;
		//return this.isLicensed('feat:advancedPermissions');
	}

	isDebugInEditorLicensed() {
		return true;
		//return this.isLicensed('feat:debugInEditor');
	}

	isBinaryDataS3Licensed() {
		return true;
		//return this.isLicensed('feat:binaryDataS3');
	}

	isMultiMainLicensed() {
		return true;
		//return this.isLicensed('feat:multipleMainInstances');
	}

	isVariablesLicensed() {
		return true;
		//return this.isLicensed('feat:variables');
	}

	isSourceControlLicensed() {
		return true;
		//return this.isLicensed('feat:sourceControl');
	}

	isExternalSecretsLicensed() {
		return true;
		//return this.isLicensed('feat:externalSecrets');
	}

	isAPIDisabled() {
		return false;
		//return this.isLicensed('feat:apiDisabled');
	}

	isWorkerViewLicensed() {
		return true;
		//return this.isLicensed('feat:workerView');
	}

	isProjectRoleAdminLicensed() {
		return true;
		//return this.isLicensed('feat:projectRole:admin');
	}

	isProjectRoleEditorLicensed() {
		return true;
		//return this.isLicensed('feat:projectRole:editor');
	}

	isProjectRoleViewerLicensed() {
		return true;
		//return this.isLicensed('feat:projectRole:viewer');
	}

	isCustomNpmRegistryLicensed() {
		return true;
		//return this.isLicensed('feat:communityNodes:customRegistry');
	}

	isFoldersLicensed() {
		return true;
		//return this.isLicensed('feat:folders');
	}

	isInsightsSummaryLicensed() {
		return true;
		//return this.isLicensed('feat:insights:viewSummary');
	}

	isInsightsDashboardLicensed() {
		return true;
		//return this.isLicensed('feat:insights:viewDashboard');
	}

	isInsightsHourlyDataLicensed() {
		return true;
		//return this.isLicensed('feat:insights:viewHourlyData');
	}

	isWorkflowDiffsLicensed() {
		return true;
		//return this.isLicensed('feat:workflowDiffs');
	}

	isProvisioningLicensed() {
		return true;
		//return this.isLicensed(['feat:saml', 'feat:oidc']);
	}

	// --------------------
	//      integers
	// --------------------

	getMaxUsers() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:users') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getMaxActiveWorkflows() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:activeWorkflows') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getMaxVariables() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:maxVariables') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getMaxAiCredits() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:aiCredits') ?? 0;
	}

	getWorkflowHistoryPruneQuota() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:workflowHistoryPrune') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getInsightsMaxHistory() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:insights:maxHistoryDays') ?? 7;
	}

	getInsightsRetentionMaxAge() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:insights:retention:maxAgeDays') ?? 180;
	}

	getInsightsRetentionPruneInterval() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:insights:retention:pruneIntervalDays') ?? 24;
	}

	getMaxTeamProjects() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:maxTeamProjects') ?? 0;
	}

	getMaxWorkflowsWithEvaluations() {
		return UNLIMITED_LICENSE_QUOTA;
		//return this.getValue('quota:evaluations:maxWorkflows') ?? 0;
	}
}
