DoctrineWorkbenchApp.factory('RelationOptionsFactory', function() {
    return {
        getCascadeOptions: function() {
            return [
                { id: 'merge', label: 'Merge' }, 
                { id: 'persist', label: 'Persist' },
                { id: 'refresh', label: 'Refresh' },
                { id: 'remove', label: 'Remove' }
            ];
        }
    };
});