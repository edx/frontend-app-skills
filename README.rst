|Build Status| |Codecov| |npm_version| |npm_downloads| |license| |semantic-release| 

frontend-app-skills
==============================

Please tag **@openedx/2u-aperture** on any PRs or issues.

Introduction
------------

This is a micro-frontend application responsible for displaying and maintaining tools for skills development. This is the current home for the B2C Skills Builder. 

Development
------------

Start the development server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In this project, install requirements and start the development server by running:

.. code:: bash
   cd frontend-app-skills
   npm install
   npm start # The server will run on port 8080

Once the dev server is up visit, `http://localhost:8080`

Environment Variables
---------------------------------

In order to run the Skills Builder, you'll need to add Algolia keys to the **.env.development** file. If you have access to the `edx-internal repo <https://github.com/edx/edx-internal>`, you can copy the ones for the Skills MFE's stage configuration. Alternatively, reach out to **@openedx/2u-aperture**.

Development Roadmap
-------------------

The following is a list of current short-term development targets, in (rough) descending order of priority:
  
* `edX Skills Builder - Fast Follows <https://2u-internal.atlassian.net/browse/APER-2299>`

* `edX Skills Builder - MVP Tech Debt <https://2u-internal.atlassian.net/browse/APER-2387>`
