<?php

namespace Mst\Utils;

use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Webmozart\Assert\Assert;

/**
 * @author javi
 */
class CompressorManager
{
    /**
     * Generate a zip file.
     * 
     * @param string $dir      dir with files to zip
     * @param string $filename name for zip file
     * 
     * @return \ZipArchive or false
     */
    public function generateZip($dir, $filename)
    {
        Assert::stringNotEmpty($dir);
        Assert::stringNotEmpty($filename);
        Assert::directory($dir);
        
        $zip = new \ZipArchive();
        $openResult = $zip->open($dir.DIRECTORY_SEPARATOR.$filename, \ZipArchive::CREATE);

        Assert::true($openResult);

        if (true === is_dir($dir)) {
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($dir), 
                RecursiveIteratorIterator::SELF_FIRST
            );

            foreach ($files as $file) {
                $file = str_replace('\\', '/', $file);

                // Ignore "." and ".." folders
                if (in_array(substr($file, strrpos($file, '/')+1), array('.', '..')) )
                    continue;

                $file = realpath($file);

                if (true === is_dir($file)) {
                    $zip->addEmptyDir(str_replace($file.DIRECTORY_SEPARATOR, '', $file.DIRECTORY_SEPARATOR));
                } elseif (true === is_file($file)) {
                    $zip->addFile($file, str_replace($dir.DIRECTORY_SEPARATOR, '', $file));
                }
            }
        } elseif (true === is_file($dir)) {
            $zip->addFile($dir, basename($dir));
        }

        $zip->close();

        return $zip;
    }
}
