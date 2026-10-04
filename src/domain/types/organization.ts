export type OrganizationType =
  | 'corporate'
  | 'client_business'
  | 'academic'
  | 'community';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  logo: string;
  website_url: string;
  location: string;
  is_confidential: boolean;
}
