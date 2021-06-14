/**
 * Copyright 2021 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Takes a GA4 account summaries array and converts it to a two dimensional 
 * array that can be written to a sheet.
 * @param {!Array} summaries GA4 account summary object.
 * @return {!Array<!Array>}
 */
function getFlattenedGA4AccountSummaries(summaries) {
  const flatSummaries = [];
  summaries.forEach(account => {
    const accountDisplayName = account.displayName;
    const accountId = account.account.split('/')[1];
    if (account.propertySummaries != undefined) {
      account.propertySummaries.forEach(property => {
        const propertyDisplayName = property.displayName;
        const propertyId = property.property.split('/')[1];
        flatSummaries.push([
          accountDisplayName,
          accountId,
          propertyDisplayName,
          propertyId
        ]);
      });
    } else {
      flatSummaries.push([accountDisplayName, accountId, '', '']);
    }
  });
  return flatSummaries;
}

/**
 * Writes GA4 account summaries to a sheet.
 */
function writeGA4AccountSummariesToSheet() {
  const summaries = listGA4AccountSummaries().accountSummaries;
  const flattenedSummaries = getFlattenedGA4AccountSummaries(summaries);
  writeToSheet(flattenedSummaries, sheetNames.ga4.accountSummaries);
}