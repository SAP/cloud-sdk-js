import {
  testEntityKeyPropGuid,
  testEntityKeyPropString,
  testEntityMultiLinkKeyProp
} from '../keys';
import { changesetHeader, requestHeader } from './header';

export const createTestEntity = [
  ...changesetHeader(),
  '',
  'POST /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity HTTP/1\\.1',
  ...requestHeader(),
  '',
  '{"StringProperty":"stringProp","Int16Property":16,"BooleanProperty":false}',
  ''
];

const createTestEntityMultiLinkAsChildOfTestEntity = [
  ...changesetHeader(),
  '',
  `POST /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity\\(KeyPropertyGuid=guid'\\${testEntityKeyPropGuid}',KeyPropertyString='\\${testEntityKeyPropString}'\\).to_MultiLink HTTP/1\\.1`,
  ...requestHeader(),
  '',
  '{"StringProperty":"multiLinkStringProp"}',
  ''
];

const patchTestEntityMultiLink = [
  ...changesetHeader(),
  '',
  `PATCH /sap/opu/odata/sap/API_TEST_SRV/A_TestEntityMultiLink\\(KeyProperty='\\${testEntityMultiLinkKeyProp}'\\) HTTP/1\\.1`,
  ...requestHeader(),
  '',
  '{"StringProperty":"multiLinkStringProp"}',
  ''
];

const putTestEntity = [
  ...changesetHeader(),
  '',
  `PUT /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity\\(KeyPropertyGuid=guid'\\${testEntityKeyPropGuid}',KeyPropertyString='\\${testEntityKeyPropString}'\\) HTTP/1\\.1`,
  ...requestHeader(),
  '',
  `{"KeyPropertyGuid":"\\${testEntityKeyPropGuid}","KeyPropertyString":"\\${testEntityKeyPropString}","StringProperty":"newStringProp"}`,
  ''
];

const deleteTestEntity = [
  ...changesetHeader(),
  '',
  `DELETE /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity\\(KeyPropertyGuid=guid'\\${testEntityKeyPropGuid}',KeyPropertyString='\\${testEntityKeyPropString}'\\) HTTP/1\\.1`,
  ...requestHeader(),
  'If-Match: \\*',
  '',
  '',
  ''
];

const createTestEntityWithAppendPath = [
  ...changesetHeader(),
  '',
  'POST /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity/\\$links/to_MultiLink HTTP/1\\.1',
  ...requestHeader(),
  '',
  '{"StringProperty":"stringProp","customPropKey":"customPropVal"}',
  ''
];

export const singleChangesetRequest = [
  'Content-Type: multipart/mixed; boundary=changeset_.*',
  '',
  '--changeset_.*',
  ...createTestEntity,
  '--changeset_.*'
];

export const multiChangesetRequest = [
  'Content-Type: multipart/mixed; boundary=changeset_.*',
  '',
  '--changeset_.*',
  ...createTestEntityMultiLinkAsChildOfTestEntity,
  '--changeset_.*',
  ...patchTestEntityMultiLink,
  '--changeset_.*',
  ...putTestEntity,
  '--changeset_.*',
  ...deleteTestEntity,
  '--changeset_.*'
];

export const singleChangesetRequestWithCustomUrl = [
  'Content-Type: multipart/mixed; boundary=changeset_.*',
  '',
  '--changeset_.*',
  ...createTestEntityWithAppendPath,
  '--changeset_.*'
];
