DoctrineWorkbenchApp.factory('RelationOptionsFactory', function() {
    return {
        getCascadeOptions: function() {
            return [
                { id: 'isCascadeMerge', label: 'Merge' }, 
                { id: 'isCascadePersist', label: 'Persist' },
                { id: 'isCascadeRefresh', label: 'Refresh' },
                { id: 'isCascadeDetach', label: 'Detach' },
                { id: 'isCascadeRemove', label: 'Remove' }
            ];
        },
        getFixedCascadeOptions: function() {
            return [ 
                'isCascadeMerge', 
                'isCascadePersist', 
                'isCascadeRefresh', 
                'isCascadeDetach', 
                'isCascadeRemove'
            ];
        }
    };
});