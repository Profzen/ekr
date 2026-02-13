import cloudinary from "@/lib/cloudinary";

type CloudinaryTarget = {
  publicId: string;
  resourceType: "image" | "video";
};

const CLOUDINARY_HOST = "res.cloudinary.com";

function parseCloudinaryTarget(url: string): CloudinaryTarget | null {
  if (!url.includes(CLOUDINARY_HOST) || !url.includes("/upload/")) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/upload/");
    if (parts.length < 2) return null;

    let publicId = parts[1];
    publicId = publicId.replace(/^v\d+\//, "");
    publicId = publicId.replace(/\.[^/.]+$/, "");
    publicId = decodeURIComponent(publicId);

    if (!publicId) return null;

    const resourceType: "image" | "video" = url.includes("/video/upload/")
      ? "video"
      : "image";

    return { publicId, resourceType };
  } catch (error) {
    return null;
  }
}

export async function deleteCloudinaryByUrl(url?: string | null) {
  if (!url) return false;

  const target = parseCloudinaryTarget(url);
  if (!target) return false;

  try {
    await cloudinary.uploader.destroy(target.publicId, {
      resource_type: target.resourceType,
      invalidate: true,
    });
    return true;
  } catch (error) {
    return false;
  }
}
