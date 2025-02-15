import type { Schema, Struct } from '@strapi/strapi';

export interface AboutBlockAbout extends Struct.ComponentSchema {
  collectionName: 'components_about_block_abouts';
  info: {
    description: '';
    displayName: 'About';
    icon: 'quote';
  };
  attributes: {
    aboutBlockDescription: Schema.Attribute.Text;
    aboutBlockImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    aboutBlockOrder: Schema.Attribute.Integer;
    aboutBlockTitle: Schema.Attribute.String;
    aboutBlockYear: Schema.Attribute.BigInteger;
  };
}

export interface BusinessLocationBusinessLocation
  extends Struct.ComponentSchema {
  collectionName: 'components_business_location_business_locations';
  info: {
    displayName: 'Business Location';
    icon: 'search';
  };
  attributes: {
    city: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    street: Schema.Attribute.String;
    streetNumber: Schema.Attribute.String;
  };
}

export interface OpeningHoursOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_opening_hours_opening_hours';
  info: {
    displayName: 'Opening Hours';
    icon: 'bulletList';
  };
  attributes: {
    endingTime: Schema.Attribute.Time;
    openingHoursDay: Schema.Attribute.String;
    startingTime: Schema.Attribute.Time;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface TeamTeam extends Struct.ComponentSchema {
  collectionName: 'components_team_teams';
  info: {
    displayName: 'Team';
    icon: 'user';
  };
  attributes: {
    teamDescription: Schema.Attribute.Text;
    teamImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    teamName: Schema.Attribute.String;
    teamRole: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-block.about': AboutBlockAbout;
      'business-location.business-location': BusinessLocationBusinessLocation;
      'opening-hours.opening-hours': OpeningHoursOpeningHours;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'team.team': TeamTeam;
    }
  }
}
