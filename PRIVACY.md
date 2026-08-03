# WindowDiffer Privacy Policy

Last updated: August 3, 2026

WindowDiffer is a browser extension developed by JonLuca DeCaro. This policy explains how the extension handles data.

## Data the extension accesses

When you click the WindowDiffer toolbar button, the extension runs on the active tab and compares that page's JavaScript `window` object with a clean browser window. It identifies the names of global properties that the page added or changed.

The comparison and its results stay on your device. Results are written to the active page's developer console and exposed to that page as a local browser event so that you can inspect them. WindowDiffer does not send page data or results to the developer or to any external service.

## Collection, storage, and sharing

WindowDiffer does not collect, upload, sell, or share personal information, browsing history, page content, form data, credentials, or communications. It does not keep any extension data after the active-page inspection ends and makes no external network requests.

## Permissions

- `activeTab` allows the extension to access only the tab on which you explicitly invoke it.
- `scripting` allows the comparison code to run in that active page.

These permissions are used only for the inspection described above.

## Changes and contact

Material changes to this policy will be reflected in this document and its updated date. Questions may be sent to [chrome@jonlu.ca](mailto:chrome@jonlu.ca).
