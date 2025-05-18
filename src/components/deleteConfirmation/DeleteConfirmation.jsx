import Swal from 'sweetalert2';

export const useDeleteConfirmation = ({ mutationHook, entityName = "item" }) => {
  const [deleteItem] = mutationHook();

  const showConfirmation = async (id, onSuccess, onError) => {
    const result = await Swal.fire({
      title: `Delete ${entityName}?`,
      text: `This will permanently delete the ${entityName}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteItem(id).unwrap();
        Swal.fire('Deleted!', '', 'success');
        // onSuccess?.();
      } catch (error) {
        Swal.fire('Error!', `Failed to delete ${entityName}`, 'error');
        // onError?.(error);
      }
    }
  };

  return showConfirmation;
};