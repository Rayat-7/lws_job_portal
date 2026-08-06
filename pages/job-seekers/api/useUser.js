import { uploadResume } from "./userApi";
import { useMutation,useQuery ,useQueryClient} from "@tanstack/react-query";
import { ApplyForJob } from "./userApi";
export const useUploadResume = (token) => {
    return useMutation({
        mutationFn: ({ file }) => uploadResume(file, token),
        onSuccess: (data) => {
            console.log("Resume uploaded successfully:", data);
        },
        onError: (error) => {
            console.error("Upload failed:", error);
        },
    });
};

export const useApplyForJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ jobId,coverLetter }) => ApplyForJob(jobId, coverLetter),
        onSuccess: (data) => {
            console.log("Applied for job successfully:", data);
            queryClient.invalidateQueries({ queryKey: ['userApplications'] });
        },
        onError: (error) => {
            console.error("Application failed:", error);
        },
    });
    
}
