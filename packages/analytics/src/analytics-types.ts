/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
export interface UsageAnalyticsOptions {
  uri?: string;
  idsitesub?: string;
  event_type?: string;
}

/**
 * Project configuration used for deciding whether analytics data will be sent or not.
 * @hidden
 */
export interface UsageAnalyticsProjectConfig {
  enabled: boolean;
  salt?: string;
}

/**
 * Parameters for the SAP Web Analytics request.
 * @hidden
 */
export interface SwaRequestParameters {
  action_name: string;
  url: string;
  idsite: string;
  idsitesub: string;
  event_type: string;
}
