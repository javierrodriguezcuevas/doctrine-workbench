<?php

namespace Mst\Utils;

use Symfony\Component\Filesystem\Filesystem;
use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class FileWriter
{
    /**
     * Write files.
     * 
     * @param string $dir           directory where save files
     * @param array  $filesContents array with file names and content
     * @param string $extension     extension for files
     * 
     * @return string $newDir directory where files are generated  
     */
    public function write($dir, array $filesContents, $extension)
    {
        Assert::stringNotEmpty($dir);
        Assert::stringNotEmpty($extension);

        $filesystem = new Filesystem();

        $newDir = $dir.DIRECTORY_SEPARATOR.uniqid();

        $filesystem->mkdir($newDir, $mode = 0750);

        foreach ($filesContents as $key => $value) {
            Assert::stringNotEmpty($value);

            $fileLocation = $newDir.DIRECTORY_SEPARATOR.$key.'.'.$extension;

            $filesystem->dumpFile($fileLocation, $value);
        }

        return $newDir;
    }
}
