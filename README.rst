|Build Status| |license|

frontend-app-skills
==============================

Please tag **@edx/edx-aperture** on any PRs or issues.

Introduction
------------

This is a micro-frontend application responsible for displaying and maintaining tools for skills development. This is the home for the B2C Skills Builder. 

Installation and Start up
-------------------------

One Time Setup
^^^^^^^^^^^^^^
.. code-block::

   # Clone the repository
   git clone https://github.com/edx/frontend-app-skills.git

   # Install requirements and start the development server by running:
   cd frontend-app-skills
   npm install
   npm start

Once the dev server is up visit, http://localhost:1992

Developing in this repo
^^^^^^^^^^^^^^^^^^^^^^^
.. code-block::

   # Pull the latest code
     git pull

   # Make a new branch for your changes
     git checkout -b <your_github_username>/<short_description>

   # Clean install/update the dev requirements
     npm ci

   # Start the MFE
     npm start
   
   # Make changes in your editor of choice, then run tests and linting
     npm test
     npm run lint

   # Commit your changes and push to your branch
     git commit -m "<commit_message>"
     git push
   
   # Open a PR and request review after Github CI has passed

Environment Variables
^^^^^^^^^^^^^^^^^^^^^

In order to run the Skills Builder, you'll need to add Algolia keys to the ``.env.development`` file. If you have access to the `edx-internal repo`_, you can copy the ones for the Skills MFE's stage configuration. Alternatively, reach out to **@edx/edx-aperture**.

Project Structure
^^^^^^^^^^^^^^^^^
The source for this project is organized into nested submodules according to the ADR `Feature-based Application Organization`_.

Development Roadmap
-------------------
  
* `edX Skills Builder - Development Roadmap`_

Contributions
-------------

This repo is not currently accepting contributions.

Reporting Security Issues
-------------------------

Please do not report security issues in public. Please email security@edx.org.


.. _edx-internal repo: https://github.com/edx/edx-internal
.. _edX Skills Builder - Development Roadmap: https://openedx.atlassian.net/wiki/spaces/COMM/pages/3764944925/Skills+MFE+Development+Roadmap
.. _Feature-based Application Organization: https://github.com/edx/frontend-app-skills/blob/main/docs/decisions/0002-feature-based-application-organization.rst
.. |Build Status| image:: https://github.com/edx/frontend-app-skills/workflows/Default%20CI/badge.svg?branch=master
   :target: https://github.com/edx/frontend-app-skills/actions?query=workflow%3A%22Default+CI%22
.. |license| image:: https://img.shields.io/badge/license-AGPL-informational
   :target: https://github.com/edx/frontend-app-skills/blob/master/LICENSE
