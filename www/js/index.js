/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        $(".wrapper").hide()
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('chcp_updateIsReadyToInstall', this.chcp_updateIsReadyToInstall, false);
        document.addEventListener('chcp_updateLoadFailed', this.chcp_updateLoadFailed, false);
        document.addEventListener('chcp_nothingToUpdate', this.chcp_nothingToUpdate, false);
        document.addEventListener('chcp_beforeInstall', this.chcp_beforeInstall, false);
        document.addEventListener('chcp_updateInstalled', this.chcp_updateInstalled, false);
        document.addEventListener('chcp_updateInstallFailed', this.chcp_updateInstallFailed, false);
        document.addEventListener('chcp_nothingToInstall', this.chcp_nothingToInstall, false);
        document.addEventListener('chcp_assetsInstallationError', this.chcp_assetsInstallationError, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
       // document.getElementById('myFetchBtn').addEventListener('click', app.checkForUpdate);
        app.checkForUpdate()
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
        console.log("ready!");    
        $(".refreshBtn").hide()
        $(".wrapper").show()
        callApi('ts',getTimeStampSuccess,{})
    },
    // chcp_updateIsReadyToInstall Event Handler
    chcp_updateIsReadyToInstall: function(eventData) {
        var html=('New release was successfully loaded and ready to be installed.');
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    // chcp_updateLoadFailed Event Handler
    chcp_updateLoadFailed: function(eventData) {
        var html=("Couldn't load update from the server.");
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    // chcp_nothingToUpdate Event Handler
    chcp_nothingToUpdate: function(eventData) {
        var html=("we successfully loaded application config from the server, but there is nothing new is available.");
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    // chcp_beforeInstall Event Handler
    chcp_beforeInstall: function(eventData) {
        var html=("An update is about to be installed.");
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    // chcp_updateInstalled Event Handler
    chcp_updateInstalled: function(eventData) {
        var html=("Update was successfully installed.");
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    // chcp_updateInstallFailed Event Handler
    chcp_updateInstallFailed: function(eventData) {
        var html=("Update installation failed. Error details are attached.");
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    // chcp_nothingToInstall Event Handler
    chcp_nothingToInstall: function(eventData) {
        var html=("There is nothing to install. Probably, nothing was loaded before that.");
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    // chcp_assetsInstallationError Event Handler
    chcp_assetsInstallationError: function(eventData) {
        var html=("Couldn't copy files from bundle on the external storage. Error details are attached.");
        var error = eventData.details.error;
        if (error) {
            html+=('<br>Error with code: ' + error.code);
            html+=('<br>Description: ' + error.description);
        }
        showAppError(html)
    },
    checkForUpdate: function() {
        var options = {
            'config-file': 'https://ads.salescvsejalan.com/update/indohalo/chcp.json',
            'request-headers': {
              'foo': 'bar'
            }
          };
        chcp.fetchUpdate(app.fetchUpdateCallback,options);
      },
    
    fetchUpdateCallback: function(error, data) {
        if (error) {
            showAppError('Failed to load the update with error code: ' + error.code);
             showAppError(error.description);
        } else {
            showAppError('Update is loaded');
            chcp.installUpdate(app.installationCallback);
        }
        //var progress = parseFloat(data.progress);
        //$("#udpateMsg").html(progress)
        //if (progress == 1.0) {
            //$("#udpateMsg").html('')
        //}
      },
      installationCallback: function(error) {
        if (error) {
          showAppError('Failed to install the update with error code: ' + error.code);
          showAppError(error.description);
        } else {
          showAppError('Update installed!');
        }
      }

    
};
