/**
 * @ngdoc directive
 * @name aaValidIcon
 *
 * @description
 * Description place holder.
 **/
(function () {
  'use strict';

  angular.module('aa.formExtensions')
    .directive('aaValidIcon', ['aaFormExtensions', function (aaFormExtensions) {
      return {
        require: 'ngModel',
        scope: false,
        compile: function (element) {
          var container = aaFormExtensions.validIconStrategy.getContainer(element);

          var validIcon = angular.element(aaFormExtensions.validIconStrategy.validIcon);
          container.append(validIcon);
          validIcon[0].style.display = 'none';

          var invalidIcon = angular.element(aaFormExtensions.validIconStrategy.invalidIcon);
          container.append(invalidIcon);
          invalidIcon[0].style.display = 'none';

          return function (scope, element, attrs, ngModel) {
            var closestForm = element.closest('form, *[ng-form]');
            var formName = closestForm.attr('name') || closestForm.attr('ng-form');
              
            /*  
            scope.$watch(formName+'.'+ngModel.$name+'.$touched', function(n, o) {
              if(ngModel.$invalid && n && !o) {
                ngModel.$$parseAndValidate();
              }
            });
              
            element.on('blur', function(e, i, a) {
                ngModel.$$parseAndValidate();
            });  
            */
            scope.fieldInFormExtensions = scope.$eval(formName + ".$aaFormExtensions" + ngModel.$name);
              
            scope.$watch(
              function() {
                return [
                  scope.fieldInFormExtensions.showErrorReasons
                ];
              }, function(n, o) {
               if(scope.fieldInFormExtensions.showErrorReasons.length > 0) {
                   ngModel.$$parseAndValidate();
               }
            });
            ngModel.$parsers.push(function (val) {

              if (ngModel.$valid || (Object.keys(ngModel.$error).length === 1 && ngModel.$error.parse)) {
                validIcon[0].style.display = '';
                invalidIcon[0].style.display = 'none';
              } else if(ngModel.$touched){
                validIcon[0].style.display = 'none';
                invalidIcon[0].style.display = '';
              }

              return val;
            });
          };
        }
      };
    }]);
})();
